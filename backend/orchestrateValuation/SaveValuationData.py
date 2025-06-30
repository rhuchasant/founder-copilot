import json
import uuid
import boto3
from datetime import datetime
from decimal import Decimal


dynamodb = boto3.resource("dynamodb", region_name="us-east-1")
eventbridge = boto3.client("events", region_name="us-east-1")
table = dynamodb.Table("StartupValuations")


def lambda_handler(event, context):
    try:
        print("Received event:", json.dumps(event))


        # Extract data from generationResult inside event
        generation = event.get("generationResult", {})
        revenue = Decimal(str(generation.get("revenue", 0)))
        market = generation.get("market", "Unknown")
        growth = generation.get("growth", "Unknown")
        valuation = generation.get("valuation_response", "No response")


        # Construct DynamoDB item
        item = {
            "id": str(uuid.uuid4()),
            "timestamp": datetime.utcnow().isoformat(),
            "revenue": revenue,
            "market": market,
            "growth": growth,
            "valuation_response": valuation
        }


        # Save to DynamoDB
        table.put_item(Item=item)


        # Send event to EventBridge
        eventbridge.put_events(
            Entries=[
                {
                    "Source": "valuation.copilot",
                    "DetailType": "ValuationCompleted",
                    "Detail": json.dumps({
                        "id": item["id"],
                        "timestamp": item["timestamp"],
                        "market": market,
                        "valuation": valuation
                    }),
                    "EventBusName": "default"
                }
            ]
        )


        # Return valuation for Step Function
        return {
            "valuation_response": valuation
        }


    except Exception as e:
        print("Error:", str(e))
        raise
