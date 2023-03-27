const { planet } = require("../astroModels");
const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);
//==================================================
module.exports = {
  //===========================================
  getPrediction: async (req, res) => {
    // console.log("-------->", planet[req.body.planet].people);

    let conversationHistory = "";
    // Define a variable to store the conversation history

    try {
      // Get the user input from the request body
      const userInput = req.body.planet;

      // Append the user input to the conversation history
      //   conversationHistory += userInput + "\n";
      let newPrompt = `Planet ${req.body.planet} in the ${req.body.house} house in the sign of ${req.body.sign}, in short as possible`;

      // Call the OpenAI API with the conversation history as the prompt
      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: newPrompt,
        temperature: 1,
        max_tokens: 3000,
        top_p: 1,
        frequency_penalty: 0.5,
        presence_penalty: 0,
      });

      // Extract the bot's response from the API response
      const botResponse = response.data.choices[0].text;

      // Append the bot's response to the conversation history
      conversationHistory += botResponse + "\n";

      // Send the bot's response back to the client
      res.status(200).send({
        bot: botResponse,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send(error || "Something went wrong");
    }

    return;

    res.status(200).json("-->");
  },
};
