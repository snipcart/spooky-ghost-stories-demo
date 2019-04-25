rm ../snipcart-ghost-demo-webhook.zip
7z a -r ../snipcart-ghost-demo-webhook.zip .
aws lambda update-function-code --function-name snipcart-ghost-demo-webhook --zip-file fileb://../snipcart-ghost-demo-webhook.zip
