const { default: axios } = require("axios");
const express = require("express");
var bodyParser = require("body-parser");
const lodash = require("lodash");
const app = express();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

const port = 3000;

const DOMAIN = process.env.DOMAIN || "https://coolbird.net";
const LOGGO = process.env.LOGGO || "https://pmsolution.tech/images/logo.png";
  
const MAPPER = {
  "work_package:created": "Ticket được tạo",
  "work_package:updated": "Ticket cập nhật",
};
app.post("/", (req, res) => {
    const spaces = lodash.get(req, ["query", "spaces"]) || "AAAAHjEk96w";
    const key =
      lodash.get(req, ["query", "key"]) ||
      "AIzaSyDdI0hCZtE6vySjMm-WEfRq3CPzqKqqsHI";
    const token =
      lodash.get(req, ["query", "token"]) ||
      "7zQLyvczoDxzKkBfaRucbT37t-rrWG6SqHZzW2rfB9M";

    const body = req.body;
    console.log(JSON.stringify(body));
    
  const link = `${lodash.get(body, [
    "work_package",
    "_links",
    "self",
    "href",
  ])}`.replace("/api/v3", DOMAIN);
  const card = {
    cardsV2: [
      {
        cardId: "createCardMessage",
        card: {
          header: {
            title: `[<b>${
              MAPPER[lodash.get(body, ["action"])] ||
              lodash.get(body, ["action"])
            }</b>] - <b>${lodash.get(body, ["work_package", "subject"])}</b>`,
            imageUrl: LOGGO,
            imageType: "CIRCLE",
          },
          sections: [
            {
              widgets: [
                {
                  decoratedText: {
                    topLabel: "Type",
                    text: `[<font color="${lodash.get(body, [
                      "work_package",
                      "_embedded",
                      "type",
                      "color",
                    ])}">${lodash.get(body, [
                      "work_package",
                      "_embedded",
                      "type",
                      "name",
                    ])}</font>]`,
                  },
                },
                {
                  decoratedText: {
                    topLabel: "Author",
                    text: `${
                      lodash.get(body, [
                        "work_package",
                        "_embedded",
                        "author",
                        "name",
                      ]) || "N/A"
                    }`,
                    startIcon: {
                      knownIcon: "PERSON",
                    },
                  },
                },
                {
                  decoratedText: {
                    topLabel: "Assignee",
                    text: `${
                      lodash.get(body, [
                        "work_package",
                        "_embedded",
                        "assignee",
                        "name",
                      ]) || "N/A"
                    }`,
                    startIcon: {
                      knownIcon: "PERSON",
                    },
                  },
                },
                {
                  decoratedText: {
                    topLabel: "Accountable",
                    text: `${
                      lodash.get(body, [
                        "work_package",
                        "_embedded",
                        "responsible",
                        "name",
                      ]) || "N/A"
                    }`,
                    startIcon: {
                      knownIcon: "PERSON",
                    },
                  },
                },

                {
                  decoratedText: {
                    topLabel: "Status",
                    text: `<font color="${lodash.get(body, [
                      "work_package",
                      "_embedded",
                      "status",
                      "color",
                    ])}">${lodash.get(body, [
                      "work_package",
                      "_embedded",
                      "status",
                      "name",
                    ])}</font>`,
                  },
                },
                {
                  decoratedText: {
                    topLabel: "Priority",
                    text: `<font color="${lodash.get(body, [
                      "work_package",
                      "_embedded",
                      "priority",
                      "color",
                    ])}">${lodash.get(body, [
                      "work_package",
                      "_embedded",
                      "priority",
                      "name",
                    ])}</font>`,
                  },
                },
                {
                  decoratedText: {
                    wrapText: true,
                    text: `${lodash.get(body, [
                      "work_package",
                      "description",
                      "raw",
                    ])}`,
                    startIcon: {
                      knownIcon: "TICKET",
                    },
                  },
                },
                {
                  buttonList: {
                    buttons: [
                      {
                        text: "View",
                        onClick: {
                          openLink: {
                            url: link,
                          },
                        },
                      },
                    ],
                  },
                },
              ],
            },
          ],
        },
      },
    ],
  };
    axios.post(
      `https://chat.googleapis.com/v1/spaces/${spaces}/messages?key=${key}&token=${token}`,
      {
        ...card,
      }
    );
  res.json({success: true});
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
