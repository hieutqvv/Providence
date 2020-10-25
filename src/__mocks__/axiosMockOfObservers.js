import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

const mock = new MockAdapter(axios);

export default {
  axiosMocks: (url, status ='') => {
    if (status !== 'error') {
      mock.onGet(url + '/observers').reply(function(config) {
        let data = [];
        if (config.params.campaignId !== undefined && Number(config.params.campaignId) === 1) {
          data = [
            {
              "observerId": "1",
              "campaignId": "1",
              "label": "observers name",
              "lifetime": "3600000",
              "priority": "0",
              "condition": {
                "channel": "web",
                "targetPhoneNumber": "0359891749",
                "defaultTrackingNumberId": "{defaultTrackingNumberId}",
                "targetDevice": "'all",
                "triggers": [
                  {
                    "target": "landing",
                    "type": "query",
                    "method": "regex",
                    "formula": ".*",
                    "subject": "utm_source"
                  }
                ]
              },
              "createdAt": "2018-12-20T12:36:59+00:00"
            }
          ];
        } else if (config.params.campaignId !== undefined && Number(config.params.campaignId) !== 1) {
          return [
            404,
            {
              "error": "Invalid request",
              "messages": "Account not exits"
            }
          ];
        }

        if(config.params.observerId !== undefined && config.params.observerId === 1) {
          data = [
            {
              "observerId": 2,
              "campaignId": 1,
              "label": "電話観測点",
              "condition": {
                "channel": "phone",
                "targetPhoneNumber": "0359891749",
                "targetDevice": "all",
                "triggers": [
                  {
                    "target": "landing",
                    "type": "query",
                    "method": "regex",
                    "formula": ".*",
                    "subject": "utm_source"
                  }
                ]
              },
              "lifetime": 3600000,
              "priority": 0,
              "createdAt": "2018-12-20T12:36:59+00:00",
              "_embedded": {
                "trackingNumbers": [
                  {
                    "trackingNumberId": 1,
                    "phoneNumber": "05053561091",
                    "observers": [
                      2
                    ]
                  }
                ]
              }
            }
          ];
        }

        return [
          200,
          {
            "count": 100,
            "total": 1,
            "_embedded": {
              "observers": data
            },
            "_schema": {
              "properties": {
                "_embedded": {
                  "properties": {
                    "observers": {
                      "items": {
                        "properties": {
                          "trackingNumberSupplierId": {
                            "type": "number",
                            "description": "計測番号提供者 ID"
                          },
                          "phoneNumber": {
                            "type": "string",
                            "description": "電話番号"
                          },
                          "forwardingPhoneNumber": {
                            "type": "string",
                            "description": "転送先電話番号"
                          },
                          "accountId": {
                            "type": "number",
                            "description": "保有元アカウント ID",
                          },
                          "campaignId": {
                            "type": "number",
                            "description": "束縛先キャンペーン ID",
                          },
                          "observers": {
                            "type": "array",
                            "description": "束縛先観測点 ID",
                            "items": {
                              "type": "number"
                            }
                          },
                          "condition": {
                            "type": "object",
                            "properties": {
                              "channel": {
                                "type": "string",
                                "description": "Tracking channel",
                                "enum": [
                                  "web",
                                  "phone"
                                ]
                              },
                              "targetPhoneNumber": {
                                "type": "string",
                                "description": "Tracking target phone number"
                              },
                              "defaultTrackingNumberId": {
                                "type": "number",
                                "description": "Default tracking number ID"
                              },
                              "targetDevice": {
                                "type": "string",
                                "description": "Tracking target device",
                                "enum": [
                                  "all",
                                  "pc",
                                  "mobile"
                                ]
                              },
                              "triggers": {
                                "type": "array",
                                "description": "Condition trigger of observation point",
                                "items": {
                                  "type": "object",
                                  "properties": {
                                    "target": {
                                      "type": "string",
                                      "description": "Target behaviors",
                                      "enum": [
                                        "landing",
                                        "referrer",
                                        "recent"
                                      ]
                                    },
                                    "type": {
                                      "type": "string",
                                      "description": "Trigger type",
                                      "enum": [
                                        "domain",
                                        "path",
                                        "query"
                                      ]
                                    },
                                    "method": {
                                      "type": "string",
                                      "description": "Evaluation method",
                                      "enum": [
                                        "equal",
                                        "forwardMatch",
                                        "partialMatch",
                                        "regex"
                                      ]
                                    },
                                    "formula": {
                                      "type": "string",
                                      "description": "Formula of evaluation"
                                    },
                                    "subject": {
                                      "type": "string",
                                      "description": "Subject of evaluation (i.g. URL parameter)"
                                    }
                                  }
                                }
                              }
                            }
                          },
                          "createdAt": {
                            "type": "string",
                            "description": "Date of creation"
                          },
                          "deletedAt": {
                            "type": "string",
                            "description": "Date of deletion"
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        ];
      });
    } else {
      mock.onGet(url + '/observers').reply(function() {
        return [
          500,
          {"error":'invalid_request', "messages": 'unknown error'}
        ];
      });
    }
  }
};
