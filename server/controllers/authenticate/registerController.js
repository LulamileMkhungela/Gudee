
const registerController = (req,res) => {
    return res.status(200).json({
        msg : 'It Works From Controller',
        id : req.params.id
    })
}

module.exports = registerController