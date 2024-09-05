const TestinomialModel = require('../Model/testinomialsModel');
const getTestinomialsFunction = async (req, res) => {
    try {
        const testinomialsObj = await TestinomialModel.find();
        res.json({
            status: true,
            message: "Getting all the testinomials",
            testinomials: testinomialsObj
        })
    } catch (error) {
        console.log("Error while getting projects from backend", error);
    }
}

const addTestinomialFunction = async (req, res) => {
    const { userName, role, description } = req.body;
    if (!(userName && role && description)) {
        return res.json({ status: true, message: "Please all the required feilds" })
    }
    try {
        const newTestinomial = await TestinomialModel.create({ userName, role, description });
        console.log(newTestinomial);
        res.json({
            status: true,
            message: "Added testinomial"
        })
    } catch (error) {
        res.json({
            status: false,
            message: "Error while Adding testinomial"
        })
        console.log("Error while add testinomial", error);
    }
}
module.exports = {
    addTestinomialFunction,
    getTestinomialsFunction
}