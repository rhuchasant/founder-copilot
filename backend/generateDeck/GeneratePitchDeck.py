import json
import boto3
import logging
import os

logger = logging.getLogger()
logger.setLevel(logging.INFO)

bedrock = boto3.client("bedrock-runtime", region_name="us-east-1")

def lambda_handler(event, context):
    try:
        logger.info("Received event: %s", event)

        body = json.loads(event.get("body", "{}"))

        # Validate required fields
        required_fields = ["deck_type", "output_format", "startup_name", "problem", "solution", "market", "traction", "team", "ask"]
        if not all(field in body and body[field] for field in required_fields):
            return {
                "statusCode": 400,
                "body": json.dumps({"error": "Missing required fields."}),
                "headers": {"Access-Control-Allow-Origin": "*"}
            }

        # Extract values
        deck_type = body["deck_type"]
        output_format = body["output_format"]
        startup_name = body["startup_name"]
        problem = body["problem"]
        solution = body["solution"]
        market = body["market"]
        traction = body["traction"]
        team = body["team"]
        ask = body["ask"]

        # Construct prompt
        prompt = f"""
Generate a {deck_type} for the startup '{startup_name}'.

Problem: {problem}
Solution: {solution}
Market: {market}
Traction: {traction}
Team: {team}
Ask: {ask}

Output format: {output_format}

Instructions:
- If the output format is 'Bullet Points', give 4–6 sharp bullet points with no slide titles.
- If the output format is 'Slides', format as Slide 1: ..., Slide 2: ..., etc.
- If the output format is 'Paragraph', write a concise paragraph without bullet points or slide labels.

Begin output:
"""

        payload = {
            "anthropic_version": "bedrock-2023-05-31",
            "messages": [{"role": "user", "content": prompt}],
            "max_tokens": 800,
            "temperature": 0.7
        }

        response = bedrock.invoke_model(
            modelId="anthropic.claude-3-sonnet-20240229-v1:0",
            body=json.dumps(payload),
            contentType="application/json",
            accept="application/json"
        )

        response_body = response["body"].read().decode("utf-8")
        result = json.loads(response_body)
        content = result.get("content", [{}])[0].get("text", "No output received.")

        return {
            "statusCode": 200,
            "body": json.dumps({"deck": content}),
            "headers": {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "*",
                "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
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
