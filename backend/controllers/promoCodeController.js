import PromoCodeModel from "../models/promoCodeModel.js";

const Create = async (req, res) => {
    const { code, discount, expiryDate } = req.body;
    try {
        // Validate input
        if (!code || !discount) {
            return res.status(400).json({ success: false, message: "Code and discount are required" });
        }

        // Check if promo code already exists
        const existingCode = await PromoCodeModel.findOne({ code: code.toUpperCase() });
        if (existingCode) {
            return res.status(400).json({ success: false, message: "Promo code already exists" });
        }

        // Create new promo code
        const newPromoCode = new PromoCodeModel({
            code: code.toUpperCase(),
            discountType: 'percentage',
            discountValue: discount,
            expiryDate: expiryDate || null,
        });

        await newPromoCode.save();
        return res.status(201).json({ success: true, message: "Promo code created successfully", data: newPromoCode });
    } catch (error) {
        console.error("Error creating promo code:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

const Delete = async (req, res) => {
    const { id } = req.query;
    try {
        if (!id) {
            return res.json({ success: false, message: "ID is required" })
        }
        const deletedPromoCode = await PromoCodeModel.findByIdAndDelete(id);
        if (!deletedPromoCode) {
            return res.json({ success: false, message: "Promo code not found" })
        }
        return res.json({ success: true, message: "Promo code deleted successfully" })
    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: "Error deleting promo code" })
    }
}

const Generate = async (req, res) => {
    try {
        // generate random length between 5 and 15
        const length = Math.floor(Math.random() * (15 - 5 + 1)) + 5;
        const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const lower = "abcdefghijklmnopqrstuvwxyz";
        const digits = "0123456789";
        const specials = "!@#$%^&*()-_=+[]{};:,.<>?/~";
        const all = upper + lower + digits + specials;

        // ensure at least one of each type is included
        const chars = [
            upper[Math.floor(Math.random() * upper.length)],
            lower[Math.floor(Math.random() * lower.length)],
            digits[Math.floor(Math.random() * digits.length)],
            specials[Math.floor(Math.random() * specials.length)]
        ];

        // fill the rest randomly
        for (let i = chars.length; i < length; i++) {
            chars.push(all[Math.floor(Math.random() * all.length)]);
        }

        // shuffle
        for (let i = chars.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [chars[i], chars[j]] = [chars[j], chars[i]];
        }

        const code = chars.join("");
        return res.json({ success: true, message: "Promo code generated successfully", data: code })
    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: "Error generating promo code" })
    }
}

const getAllPromoCodes = async (req, res) => {
    try {
        const promoCodes = await PromoCodeModel.find();
        return res.json({ success: true, message: "Promo codes retrieved successfully", data: promoCodes })
    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: "Error retrieving promo codes" })
    }
}

const applyPromoCode = async (req, res) => {
    const { code, orderAmount } = req.body;

    try {
        // Validate input
        if (!code) {
            return res.status(400).json({ success: false, message: "Promo code is required" });
        }

        // Find promo code
        const promoCode = await PromoCodeModel.findOne({ code: code.toUpperCase() });
        console.log(promoCode);
        if (!promoCode) {
            return res.status(404).json({ success: false, message: "Promo code not found" });
        }

        // Check if promo code is expired
        if (promoCode.isExpired()) {
            return res.status(400).json({ success: false, message: "Promo code is expired" });
        }

        // Check if promo code can be used
        if (!promoCode.canBeUsed(orderAmount)) {
            return res.status(400).json({ success: false, message: "Promo code cannot be applied to this order" });
        }

        // Calculate discount
        const discount = promoCode.discountType === 'percentage'
            ? (orderAmount * promoCode.discountValue) / 100
            : promoCode.discountValue;

        return res.json({
            success: true,
            message: "Promo code applied successfully",
            data: {
                discount,
                discountPercentage: promoCode.discountValue + "%",
                finalAmount: orderAmount - discount,
            },
        });
    } catch (error) {
        console.error("Error applying promo code:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export { Create, Delete, Generate, getAllPromoCodes, applyPromoCode }