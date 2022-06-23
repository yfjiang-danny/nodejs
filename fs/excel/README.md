# Excel

## Read

```
node read.js --input=xxx.json --output=xxx.xlsx
```

## Write

```
node write.js --input=xxx.xlsx --output=xxx.json
```

## xxx.json

```json
[
  {
    "name": "sheet1",
    "data": [
      ["row1_column1_value", "row1_column2_value"],
      ["row2_column1_value", "row2_column2_value"]
    ]
  },
  {
    "name": "sheet2",
    "data": [
      ["row1_column1_value", "row1_column2_value"],
      ["row2_column1_value", "row2_column2_value"]
    ]
  }
]
```
