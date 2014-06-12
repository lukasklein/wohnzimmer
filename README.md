wohnzimmer
==========


Firebase security rules:

```json
{
    "rules": {
        ".read": true,
        "offers": {
          "$offer": {
            ".write": "!data.exists()",
            ".validate": "newData.hasChildren(['name', 'offer', 'from', 'to'])",
            "name": {
              ".validate": "newData.isString()"
            },
            "offer": {
              ".validate": "newData.isString()"
            },
            "from": {
              ".validate": "newData.isNumber() && newData.val() >= 10 && newData.val() <= 19"
            },
            "to": {
              ".validate": "newData.isNumber() && newData.val() >= 10 && newData.val() <= 19 && newData.val() >= newData.parent().child('from').val()"
            }
          }
        }
    }
}```
