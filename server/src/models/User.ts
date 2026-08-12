import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';
import { UserRole, UserStatus } from '@/constants/enums/user';
import { env } from '@/config/env';

export interface IUser extends Document {
  _id: mongoose.Types.ObjectId;
  email: string;
  password: string;
  role: UserRole;
  status: UserStatus;
  lastLogin: Date;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;  
  isVerified: boolean;
  emailVerificationToken: string;
  emailVerificationExpires: Date;
  passwordResetToken: string;
  passwordResetExpires: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
};

const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [8, 'Password must be at least 8 characters'],
      select: false
    },
    role: {
      type: String,
      enum: Object.values(UserRole),
      required: [true, 'Role is required'],
      default: UserRole.CLIENT
    },
    status: {
      type: String,
      enum: Object.values(UserStatus),
      default: UserStatus.PENDING_VERIFICATION
    },
    lastLogin: {
      type: Date,
      default: null
    },
    deletedAt: {
      type: Date,
      default: null
    },
    isVerified: {
      type: Boolean,
      default: false
    },
    emailVerificationToken: {
      type: String,
      select: false
    },
    emailVerificationExpires: {
      type: Date,
      select: false,
    },
    passwordResetToken: {
      type: String,
      select: false,
    },
    passwordResetExpires: {
      type: Date,
      select: false,
    }
  },
  {
    timestamps: true,
    collection: 'users'
});

userSchema.index({ emailVerificationToken: 1 }, {sparse: true, expireAfterSeconds: 86400 });
userSchema.index({ passwordResetToken: 1 }, {sparse: true, expireAfterSeconds: 3600 });

userSchema.pre<IUser>('save', async function() {
  if (!this.isModified('password')) return;

    const salt = await bcrypt.genSalt(env.BCRYPT_SALT_ROUNDS);
    this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

userSchema.statics.findActive = function() {
  return this.find({ deletedAt: null });
};

export const User = mongoose.model<IUser>('User', userSchema);