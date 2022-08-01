const express = require("express");
const Point = require("../models/Points");
const auth = require("../middleware/auth.middleware");

const router = express.Router({ mergeParams: true });

router.patch("/:pointId", auth, async (req, res) => {
    try {
        const { pointId } = req.params;
        if (pointId === req.points._id) {
            const updatePoint = await Point.findByIdAndUpdate(
                pointId,
                req.body,
                {
                    new: true,
                }
            );
            res.send(updatePoint);
        } else {
            res.status(401).json({ message: "Unauthorized" });
        }
    } catch (error) {
        res.status(500).json({
            message: "На сервере произошла ошибка. Попробуйте позже",
        });
    }
});

router.get("/", async (req, res) => {
    try {
        const points = await Point.find();
        res.send(points);
    } catch (error) {
        res.status(500).json({
            message: "На сервере произошла ошибка. Попробуйте позже",
        });
    }
});

module.exports = router;
