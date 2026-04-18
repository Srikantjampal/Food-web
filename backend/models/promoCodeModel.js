import mongoose from 'mongoose';

const PromoCode_schema = new mongoose.Schema({
        code: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            uppercase: true,
        },
        discountType: {
            type: String,
            enum: ['percentage', 'fixed'],
            required: true,
            default: 'percentage',
        },
        discountValue: {
            type: Number,
            required: true,
            min: 0,
        },
        minOrderValue: {
            type: Number,
            default: 0,
            min: 0,
        },
        expiryDate: {
            type: Date,
        },
        usageLimit: {
            // total allowed uses (null = unlimited)
            type: Number,
            default: null,
            min: 0,
        },
        usedCount: {
            type: Number,
            default: 0,
            min: 0,
        },
        singleUsePerUser: {
            type: Boolean,
            default: false,
        },
        applicableProducts: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
            },
        ],
        isActive: {
            type: Boolean,
            default: true,
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        notes: {
            type: String,
            trim: true,
        },
    },
    {
        timestamps: true,
    }
);

PromoCode_schema.pre('save', function (next) {
    if (this.code) this.code = this.code.toUpperCase();
    next();
});
PromoCode_schema.methods.isExpired = function () {
    return this.expiryDate ? this.expiryDate.getTime() < Date.now() : false;
};

PromoCode_schema.methods.canBeUsed = function (orderAmount = 0) {
    if (!this.isActive) return false;
    if (this.isExpired()) return false;
    if (this.usageLimit !== null && this.usedCount >= this.usageLimit) return false;
    if (orderAmount < (this.minOrderValue || 0)) return false;
    return true;
};

const PromoCodeModel = mongoose.models.PromoCode || mongoose.model("PromoCode", PromoCode_schema);
export default PromoCodeModel;