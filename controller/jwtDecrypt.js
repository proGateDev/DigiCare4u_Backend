
exports.getJWTDetails = async (req, res) => {
    try {


        return res.status(200).json({
            status: 200,
            message: 'JWT decrypted successfully',
            id: req.userId
        });
    } catch (error) {
        return res.status(500).json({ message: 'Error creating schedule', error });
    }
};

