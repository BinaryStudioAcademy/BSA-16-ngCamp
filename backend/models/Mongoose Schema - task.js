{
    "title": {
        "type": "String"
    },
    "project": {
        "type": "Schema.Types.ObjectId"
    },
    "description": {
        "type": "String"
    },
    "author": {
        "type": "Schema.Types.ObjectId"
    },
    "dateCreated": {
        "type": "Date"
    },
    "files": [],
    "archived": {
        "type": "Boolean"
    },
    "isFinished": {
        "type": "Boolean"
    },
    "todos": [
        {
            "title": {
                "type": "String"
            },
            "description": {
                "type": "String"
            },
            "status": {
                "type": "String"
            },
            "creationDate": {
                "type": "Date"
            },
            "participants": [],
            "experationDate": {
                "type": "Date"
            },
            "finishDate": {
                "type": "Date"
            }
        }
    ]
}