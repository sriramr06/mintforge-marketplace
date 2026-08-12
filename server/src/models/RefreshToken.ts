import mongoose, { Schema, Document } from 'mongoose';

export interface IRefreshToken extends Document {
  _id: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  token: string;
  expiresAt: Date;
  isRevoked: boolean;
  isUsed: boolean;
  userAgent?: string;
  ipAddress?: string;
  deviceInfo?: {
    deviceId?: string;
    deviceType?: 'mobile' | 'tablet' | 'desktop' | 'other';
    os?: string;
    browser?: string;
    platform?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const refreshTokenSchema = new Schema<IRefreshToken>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true
    },
    token: {
      type: String,
      required: true,
      unique: true,
      index: true
    },
    expiresAt: {
      type: Date,
      required: true,
      index: { expires: 0 } // MongoDB TTL index - auto deletes at expiry
    },
    isRevoked: {
      type: Boolean,
      default: false
    },
    isUsed: {
      type: Boolean,
      default: false
    },
    userAgent: {
      type: String,
      trim: true,
      maxlength: 500
    },
    ipAddress: {
      type: String,
      trim: true
    },
    deviceInfo: {
      deviceId: {
        type: String,
        trim: true
      },
      deviceType: {
        type: String,
        enum: ['mobile', 'tablet', 'desktop', 'other'],
        default: 'other'
      },
      os: {
        type: String,
        trim: true
      },
      browser: {
        type: String,
        trim: true
      },
      platform: {
        type: String,
        trim: true
      }
    }
  },
  {
    timestamps: true,
    collection: 'refresh_tokens'
  }
);

// Compound indexes for efficient queries
refreshTokenSchema.index({ userId: 1, isRevoked: 1 });
refreshTokenSchema.index({ token: 1, isRevoked: 1 });
refreshTokenSchema.index({ userId: 1, isUsed: 1 });

refreshTokenSchema.statics.findActiveToken = async function (token: string) {
  return this.findOne({
    token,
    isRevoked: false,
    isUsed: false,
    expiresAt: { $gt: new Date() }
  });
};

refreshTokenSchema.statics.cleanExpired = async function() {
  return this.deleteMany({
    expiresAt: { $lt: new Date() }
  });
};

refreshTokenSchema.methods.markAsUsed = async function (this: IRefreshToken) {
  this.isUsed = true;
  return this.save();
};

export const RefreshToken = mongoose.model<IRefreshToken>('RefreshToken', refreshTokenSchema);