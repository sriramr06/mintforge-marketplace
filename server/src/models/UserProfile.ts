import mongoose, { Schema, Document } from "mongoose";
import { UserRole, Gender } from "@/constants/enums/user";
import { SkillCategory } from "@/constants/enums/skills";

export interface IAddress {
  street?: string;
  area?: string;
  city?: string;
  state?: string;
  country?: string;
  zipCode?: string;
}

export interface IPortfolioItem {
  title: string;
  description?: string;
  thumbnail?: string;
  images?: string[];
  liveUrl: string;
  repoUrl?: string;
  caseStudy?: string;
  technologies: string[];
  startDate: Date;
  endDate: Date;
  isFeatured: boolean;
  clientName?: string;
  role?: string;
  challenges?: string;
  outcome?: string;
}

export interface IExperience {
  title: string;
  company: string;
  city?: string;
  startYear: number;
  endYear?: number;
  isCurrent: boolean;
  description?: string;
  technologies?: string[];
  achievements?: string[];
}

export interface IEducation {
  degree: string;
  institution: string;
  course?: string;
  city?: string;
  startYear: number;
  endYear?: number;
  isCurrent: boolean;
}

export interface ICertification {
  name: string;
  issuer: string;
  issueDate: Date;
  expiryDate?: Date;
  credentialId?: string;
  credentialUrl?: string;
}

export interface ISocialLinks {
  linkedin?: string;
  github?: string;
  twitter?: string;
  website?: string;
  behance?: string;
  dribbble?: string;
  youtube?: string;
}

export interface IRating {
  average: number;
  count: number;
}

export interface IUserProfile extends Document {
  userId: mongoose.Types.ObjectId;
  role: UserRole;
  personal: {
    fullName: string;
    displayName?: string;
    gender: Gender,
    avatar: string;
    phone?: string;
    bio?: string;
    dateOfBirth?: Date;
    nationality?: string;
    languages?: Array<{
      language: string;
      proficiency: 'basic' | 'conversational' | 'professional' | 'native';
    }>;
  }

  address: IAddress;

  skills: Array<{
    category: SkillCategory;
    subSkills: string[];
    yearsOfExperience?: number;
    proficiency?: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  }>
  expertise?: string[]; // Top 5 skills marked as expert

  availability: {
    hourlyRate?: number;
    availableHours?: number; // Per week
    isAvailable?: boolean;
    nextAvailable?: Date;
    preferredProjectSizes?: ('small' | 'medium' | 'large' | 'enterprise')[];
    preferredEngagementTypes?: ('hourly' | 'fixed'| 'retainer')[];
  }

  portfolio: IPortfolioItem[];
  socialLinks?: ISocialLinks;

  experience: IExperience[];
  education: IEducation[];
  certifications: ICertification[];

  rating: IRating;
  completedProjects: number;
  successRate?: number;
  responseTime?: number;

  companyName?: string;
  companyLogo?: string;
  companyWebsite?: string;
  companySize?: '1-10' | '11-50' | '51-200' | '201-500' | '500+';
  industry?: string;
  companyDescription?: string;
  totalProjectsPosted?: number;

  favorites?: mongoose.Types.ObjectId[];

  notificationPreferences?: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };

  privacySettings?: {
    showEmail: boolean;
    showPhone: boolean;
    showRates: boolean;
    showPortfolio: boolean;
  };

  createdAt: Date;
  updatedAt: Date;
}

const portfolioItemSchema = new Schema<IPortfolioItem>(
  {
    title: { type: String, required: true },
    description: { type: String },
    thumbnail: { type: String },
    images: { type: [String], default: [] },
    liveUrl: { type: String, required: true },
    repoUrl: { type: String },
    caseStudy: { type: String },
    technologies: { type: [String], default: [] },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    isFeatured: { type: Boolean, default: false },
    clientName: { type: String },
    role: { type: String },
    challenges: { type: String },
    outcome: { type: String }
  },
  { timestamps: false }
);

const experienceSchema = new Schema<IExperience>(
  {
    title: { type: String, required: true },
    company: { type: String, required: true },
    city: { type: String },
    startYear: { type: Number, required: true },
    endYear: { type: Number },
    isCurrent: { type: Boolean, default: false },
    description: { type: String },
    technologies: { type: [String], default: [] },
    achievements: { type: [String], default: [] }
  },
  { timestamps: false }
);

const educationSchema = new Schema<IEducation>(
  {
    degree: { type: String, required: true },
    institution: { type: String, required: true },
    course: { type: String },
    city: { type: String },
    startYear: { type: Number, required: true },
    endYear: { type: Number },
    isCurrent: { type: Boolean, default: false }
  },
  { timestamps: false }
);

const certificationSchema = new Schema<ICertification>(
  {
    name: { type: String, required: true },
    issuer: { type: String, required: true },
    issueDate: { type: Date, required: true },
    expiryDate: { type: Date },
    credentialId: { type: String },
    credentialUrl: { type: String }
  },
  { timestamps: false }
);

const userProfileSchema = new Schema<IUserProfile>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User is required'],
      unique: true
    },
    role: {
      type: String,
      enum: Object.values(UserRole),
      required: [true, 'Role is required']
    },
    personal: {
      fullName: { type: String, required: [true, 'Full name is required'] },
      displayName: { type: String },
      gender: { type: String, enum: Object.values(Gender) },
      avatar: { type: String, required: [true, 'Avatar is required'] },
      phone: { type: String },
      bio: { type: String },
      dateOfBirth: { type: Date },
      nationality: { type: String },
      languages: [
        {
          _id: false,
          language: { type: String, required: true },
          proficiency: {
            type: String,
            enum: ['basic', 'conversational', 'professional', 'native']
          }
        }
      ]
    },
    address: {
      street: { type: String },
      area: { type: String },
      city: { type: String },
      state: { type: String },
      country: { type: String },
      zipCode: { type: String }
    },
    skills: [
      {
        _id: false,
        category: { type: String, enum: Object.values(SkillCategory), required: true },
        subSkills: { type: [String], default: [] },
        yearsOfExperience: { type: Number },
        proficiency: {
          type: String,
          enum: ['beginner', 'intermediate', 'advanced', 'expert']
        }
      }
    ],
    expertise: { type: [String], default: [] },
    availability: {
      hourlyRate: { type: Number },
      availableHours: { type: Number },
      isAvailable: { type: Boolean, default: true },
      nextAvailable: { type: Date },
      preferredProjectSizes: {
        type: [String],
        enum: ['small', 'medium', 'large', 'enterprise'],
        default: []
      },
      preferredEngagementTypes: {
        type: [String],
        enum: ['hourly', 'fixed', 'retainer'],
        default: []
      }
    },
    portfolio: { type: [portfolioItemSchema], default: [] },
    socialLinks: {
      linkedin: { type: String },
      github: { type: String },
      twitter: { type: String },
      website: { type: String },
      behance: { type: String },
      dribbble: { type: String },
      youtube: { type: String }
    },
    experience: { type: [experienceSchema], default: [] },
    education: { type: [educationSchema], default: [] },
    certifications: { type: [certificationSchema], default: [] },
    rating: {
      average: { type: Number, default: 0 },
      count: { type: Number, default: 0 }
    },
    completedProjects: { type: Number, default: 0 },
    successRate: { type: Number },
    responseTime: { type: Number },
    companyName: { type: String },
    companyLogo: { type: String },
    companyWebsite: { type: String },
    companySize: {
      type: String,
      enum: ['1-10', '11-50', '51-200', '201-500', '500+']
    },
    industry: { type: String },
    companyDescription: { type: String },
    totalProjectsPosted: { type: Number, default: 0 },
    favorites: [{ type: Schema.Types.ObjectId, ref: 'UserProfile' }],
    notificationPreferences: {
      email: { type: Boolean, default: true },
      push: { type: Boolean, default: true },
      sms: { type: Boolean, default: false }
    },
    privacySettings: {
      showEmail: { type: Boolean, default: false },
      showPhone: { type: Boolean, default: false },
      showRates: { type: Boolean, default: true },
      showPortfolio: { type: Boolean, default: true }
    }
  },
  {
    timestamps: true,
    collection: 'userprofiles'
  }
);

userProfileSchema.index({ fullName: 1 });
userProfileSchema.index({ 'skills.subSkills': 1 });
userProfileSchema.index({ 'rating.average': -1 });
userProfileSchema.index({ 'availability.hourlyRate': 1});
userProfileSchema.index({ 'availability.isAvailable': 1 });
userProfileSchema.index({ 'address.country': 1 });
userProfileSchema.index({ role: 1 });
userProfileSchema.index({ expertise: 1 });

userProfileSchema.set('toJSON', {
  transform: function(_doc, ret) {
    const transformed = ret as any;
    delete transformed._id;
    delete transformed.__v;
    return transformed;
  }
});


export const UserProfile = mongoose.model<IUserProfile>('UserProfile', userProfileSchema);
