import json
import boto3
import logging
from decimal import Decimal

logger = logging.getLogger()
logger.setLevel(logging.INFO)

bedrock = boto3.client("bedrock-runtime", region_name="us-east-1")

def lambda_handler(event, context):
    try:
        logger.info("Event: %s", event)

        # Directly access input from event (Step Function passes raw JSON)
        revenue = Decimal(str(event.get("revenue", 50000)))
        market = event.get("market", "SaaS")
        growth = event.get("growth", "10% MoM")

        # Prepare Claude prompt
        prompt = f"Estimate valuation for a {market} startup earning ${revenue}/month with {growth} growth."

        # Bedrock Claude payload
        payload = {
            "anthropic_version": "bedrock-2023-05-31",
            "messages": [
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            "max_tokens": 300,
            "temperature": 0.7
        }

        # Call Claude
        response = bedrock.invoke_model(
            modelId="anthropic.claude-3-sonnet-20240229-v1:0",
            body=json.dumps(payload),
            contentType="application/json",
            accept="application/json"
        )

        response_body = response["body"].read().decode("utf-8")
        result = json.loads(response_body)

        # Extract Claude's output
        full_text = result.get("content", [{}])[0].get("text", "No output received")

        # Return everything back to Step Function
        return {
            "revenue": float(revenue),
            "market": market,
            "growth": growth,
            "valuation_response": full_text
        }

    except Exception as e:
        logger.error("Exception occurred: %s", str(e))
        return {
            "error": str(e)
        }