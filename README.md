Startup Valuation Copilot- PitchPulse An AI-powered platform that helps startup founders estimate their company valuation, generate pitch decks (Investor, Elevator, Stakeholder), and visualize financial forecasts—all using AWS serverless technologies and Amazon Bedrock.

DEPLOYED AT: https://main.d2af3486wkdk1y.amplifyapp.com

What it does Estimates startup valuation based on revenue, market, and growth rate

Summarizes valuation insights in bullet points using LLMs

Generates pitch decks (e.g. Investor, Elevator, Stakeholder)

Uploads & displays financial forecast graphs

All accessible via a clean, responsive frontend UI deployed on AWS Amplify

How We Built It Frontend: Built using Next.js, styled with custom CSS, deployed on AWS Amplify

Backend: Fully serverless architecture using AWS Lambda, API Gateway, and Step Functions

AI Generation: Integrated Amazon Bedrock with Claude for valuation summaries and pitch decks

Persistence: Used DynamoDB to store startup data

Storage: Uploaded forecast charts to S3 using a Lambda-triggered endpoint

Workflow: Step Functions orchestrate validation, generation, saving, and event logging

Events: EventBridge captures valuation completion events

AWS Lambda in This Project We used AWS Lambda as the backbone of our backend logic:

TriggerValuationWorkflow: Starts the valuation Step Function using API Gateway ValidateValuationInput: Sanitizes and verifies user input GenerateValuation: Calls Amazon Bedrock to generate valuation content SaveValuationData: Stores validated startup data in DynamoDB and sends EventBridge events GeneratePitchDeck: Returns pitch decks dynamically based on type and format UploadValuationGraph: Accepts base64-encoded images and uploads them to S3

All these Lambda functions are invoked through API Gateway, ensuring a serverless, low-maintenance backend.

What we learned We deep-dived into building production-grade serverless applications using AWS. We explored prompt engineering with Claude on Bedrock, orchestrated real-time backend flows using Step Functions, and discovered best practices for file storage, events, and API management in a cloud-native way.

AWS Tools Used AWS Lambda, Amazon API Gateway, AWS Step Functions, Amazon Bedrock, Amazon S3, Amazon DynamoDB, Amazon EventBridge, AWS IAM, AWS Amplify
