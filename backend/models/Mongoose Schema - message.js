{
    "title": {
        "type": "String"
    },
    "description": {
        "type": "String"
    },
    "author": {
        "type": "Schema.Types.ObjectId"
    },
    "project": {
        "type": "Schema.Types.ObjectId"
    },
    "date": {
        "type": "Date"
    },
    "comments": [
        {
            "author": {
                "type": "Schema.Types.ObjectId"
            },
            "date": {
                "type": "Date"
            },
            "description": {
                "type": "String"
            },
            "files": []
        }
    ],
    "files": []
}