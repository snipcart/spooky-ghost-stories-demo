rm ../snipcart-ghost-demo-schedule.zip
7z a -r ../snipcart-ghost-demo-schedule.zip .
aws lambda update-function-code --function-name snipcart-ghost-demo-schedule --zip-file fileb://../snipcart-ghost-demo-schedule.zip