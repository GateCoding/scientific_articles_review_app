const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const multer = require("multer");
const cors = require("cors");
const { Configuration, OpenAIApi } = require("openai");
const pdf = require("pdf-parse");
const fs = require("fs");
const { Console } = require("console");

// Set your OpenAI API key
const config = new Configuration({
  apiKey: "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",
});
const openai = new OpenAIApi(config);
app.use(
  bodyParser.text(),
  cors({
    origin: "http://localhost:3000", // Change this to your frontend's URL
    credentials: true,
  })
);

// app.use(express.json());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Folder where files will be saved
  },
  filename: (req, file, cb) => {
    // const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    // const extname = path.extname(file.originalname);
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });
app.post("/summarize-pdf", upload.single("file-upload"), async (req, res) => {
  const filePath = req.file.path;
  console.log("file " + filePath);
  try {
    // Get the filePath from the request body

    // Check if filePath is defined and is a string
    if (typeof filePath === "string" && filePath.trim() !== "") {
      const dataBuffer = fs.readFileSync(filePath);
      const data = await pdf(dataBuffer);

      let pdfSummaryText = "";
      console.log("ttttttttt" + data.numpages);
      for (let page_num = 0; page_num < data.numpages; page_num++) {
        const pageText = data.text;
        const pageTextLower = pageText.toLowerCase();

        console.log("pageTextLower 22 " + pageTextLower);
        const response = await openai.createCompletion({
          model: "gpt-3.5-turbo",
          max_tokens: 512,
          temperature: 0,
          messages: [
            {
              role: "system",
              content: "You are a helpful research assistant.",
            },
            { role: "user", content: `Summarize this: ${pageTextLower}` },
          ],
        });

        const pageSummary = response.send(
          completion.data.choices[0].message.content
        );
        pdfSummaryText += pageSummary + "\n";
        console.log("summry " + pageSummary);
      }

      const pdfSummaryFilePath = filePath.replace(".pdf", "_summary.txt");
      fs.writeFileSync(pdfSummaryFilePath, pdfSummaryText);

      res.json({ success: true, summaryFilePath: data });
    } else {
      // Handle the case where filePath is missing or invalid
      res.status(400).json({ success: false, error: "Invalid filePath" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
