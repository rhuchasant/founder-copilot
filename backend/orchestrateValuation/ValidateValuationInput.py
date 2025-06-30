import json

def lambda_handler(event, context):
    revenue = event.get("revenue")
    market = event.get("market")
    growth = event.get("growth")

    # Basic validation
    if not revenue or not isinstance(revenue, (int, float)) or revenue <= 0:
        return {
            "statusCode": 400,
            "body": json.dumps({"error": "Invalid revenue"})
        }
    
    if not market or not isinstance(market, str):
        return {
            "statusCode": 400,
            "body": json.dumps({"error": "Invalid market"})
        }
    
    if not growth or not isinstance(growth, str):
        return {
            "statusCode": 400,
            "body": json.dumps({"error": "Invalid growth"})
        }

    # Return valid input to the next step
    return {
        "revenue": revenue,
        "market": market,
        "growth": growth
    }
