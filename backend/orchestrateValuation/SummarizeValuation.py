import json
import boto3
import logging

logger = logging.getLogger()
logger.setLevel(logging.INFO)

bedrock = boto3.client("bedrock-runtime", region_name="us-east-1")

def lambda_handler(event, context):
    try:
        logger.info("Received event: %s", json.dumps(event))

        # Parse request body
        body = json.loads(event.get("body", "{}"))
        text = body.get("valuation_response")

        if not text:
            return {
                "statusCode": 400,
                "body": json.dumps({"error": "Missing text to summarize."}),
                "headers": {
                    "Access-Control-Allow-Origin": "*"
                }
            }

        # Claude prompt
        prompt = f"Summarize the following startup valuation in 4-5 bullet points:\n\n{text}"

        payload = {
            "anthropic_version": "bedrock-2023-05-31",
            "messages": [{"role": "user", "content": prompt}],
            "max_tokens": 200,
            "temperature": 0.5
        }

        response = bedrock.invoke_model(
            modelId="anthropic.claude-3-sonnet-20240229-v1:0",
            body=json.dumps(payload),
            contentType="application/json",
            accept="application/json"
        )

        body = json.loads(response["body"].read().decode("utf-8"))
        summary = body.get("content", [{}])[0].get("text", "No summary returned.")

        return {
            "statusCode": 200,
            "body": json.dumps({"summary": summary}),
            "headers": {
                "Access-Control-Allow-Origin": "*"
            }
        }

    except Exception as e:
        logger.error("Error: %s", str(e))
        return {
            "statusCode": 500,
            "body": json.dumps({"error": str(e)}),
            "headers": {
                "Access-Control-Allow-Origin": "*"
            }
        }
