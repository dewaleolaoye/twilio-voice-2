const express = require("express");
const ClientCapability = require("twilio").jwt.ClientCapability;
const VoiceResponse = require("twilio").twiml.VoiceResponse;
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());
// app.use(express.urlencoded());

require("dotenv/config");
app.post("/token", (req, res) => {
  // put your Twilio API credentials here
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  // const identity = "";
  // console.log(req.body);
  const { identity } = req.body;

  // put your Twilio Application Sid here
  const appSid = process.env.TWILIO_APP_SID;
  const identity_ = identity ? identity : "wale";

  const capability = new ClientCapability({
    accountSid: accountSid,
    authToken: authToken
  });

  capability.addScope(
    new ClientCapability.OutgoingClientScope({
      applicationSid: appSid,
      clientName: identity_
    })
  );
  capability.addScope(new ClientCapability.IncomingClientScope(identity_));
  const token = capability.toJwt();

  console.log(token);

  res.set("Content-Type", "application/jwt");
  res.header("Access-Control-Allow-Origin", "*");
  // res.send(token);
  // res.status
  res.json({
    identity: identity_,
    token: token
  });
});

app.post("/voice", (req, res) => {
  // TwiML response
  // const twiml = new VoiceResponse();
  // twiml.say("Thanks for calling!");
  // res.set("Content-Type", "text/xml");
  // res.send(twiml.toString());
});

const PORT = 9000;
app.listen(PORT, (req, res) => {
  console.log(`server running on port ${PORT}`);
});
