import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

const mock = new MockAdapter(axios);
const arrayAccountId = ['1', '2', '3', '4'];
export default {
  mockAxiosAccounts: (url, status = '') => {
    const linkAccount = url + '/accounts';
    const linkCampaign = url + '/campaigns';
    if (status !== 'error') {
      mock.onGet(linkAccount).reply(function(config) {
        let data = [];
        let params = config.params.relationshipTypes !== undefined ? config.params.relationshipTypes.split(','): [];
        if (
          config.params.relationshipTypes !== undefined
          || config.params.accountId !== undefined
        ) {
          if (
            params.length === 4
          ) {
            data = [
              {
                "accountId": 1,
                "label": "account owner",
                "ownerId": 1,
                "agencyId": 1,
                "isAgency": true,
                "createdAt": "2019-04-01T16:58:02+09:00",
              },
              {
                "accountId": 2,
                "label": "account belongs",
                "ownerId": 1,
                "agencyId": 1,
                "isAgency": true,
                "createdAt": "2019-04-01T16:58:02+09:00",
              },
              {
                "accountId": 3,
                "label": "account client",
                "ownerId": 1,
                "agencyId": 1,
                "isAgency": false,
                "createdAt": "2019-04-01T16:58:02+09:00",
              },
              {
                "accountId": 4,
                "label": "account agency",
                "ownerId": 1,
                "agencyId": 1,
                "isAgency": true,
                "createdAt": "2019-04-01T16:58:02+09:00",
              }
            ];
          }

          if (config.params.accountId !== undefined && Number(config.params.accountId) === 1) {
            data = [
              {
                "accountId": 1,
                "label": "account owner",
                "ownerId": 1,
                "agencyId": 1,
                "isAgency": true,
                "createdAt": "2019-04-01T16:58:02+09:00",
                "_embedded": {
                  "accounts": [
                    {
                      "accountId": "1",
                      "label": "account name"
                    }
                  ],
                  "campaigns": [
                    {
                      "campaignId": "1",
                      "label": "Campaign name 1"
                    }
                  ]
                }
              },
            ];
          } else if (config.params.accountId !== undefined && Number(config.params.accountId) === 2) {
            data = [
              {
                "accountId": 2,
                "label": "account belongs",
                "ownerId": 1,
                "agencyId": 1,
                "isAgency": true,
                "createdAt": "2019-04-01T16:58:02+09:00",
                "_embedded": {
                  "campaigns": [
                    {
                      "campaignId": "2",
                      "label": "Campaign name 2"
                    }
                  ]
                }
              },
            ];
          } else if (config.params.accountId !== undefined && Number(config.params.accountId) === 3) {
            data = [
              {
                "accountId": 3,
                "label": "account client",
                "ownerId": 1,
                "agencyId": 1,
                "isAgency": false,
                "createdAt": "2019-04-01T16:58:02+09:00",
                "_embedded": {
                  "campaigns": [
                    {
                      "campaignId": "3",
                      "label": "Campaign name 3"
                    }
                  ]
                }
              },
            ];
          } else if (config.params.accountId !== undefined && Number(config.params.accountId) === 4) {
            data = [
              {
                "accountId": 4,
                "label": "account agency",
                "ownerId": 1,
                "agencyId": 1,
                "isAgency": true,
                "createdAt": "2019-04-01T16:58:02+09:00",
                "_embedded": {
                  "campaigns": [
                    {
                      "campaignId": "4",
                      "label": "Campaign name 4"
                    }
                  ]
                }
              },
            ];
          } else if (config.params.accountId !== undefined && !arrayAccountId.includes(config.params.accountId) ) {
            return [
              404,
              {
                "error": "Invalid request",
                "messages": "Account not exits"
              }
            ];
          };
          
          return [
            200,
            {
              "count": 100,
              "total": 1,
              "_embedded": {
                "accounts": data
              },
              "_schema": {
                "properties": {
                  "_embedded": {
                    "properties": {
                      "accounts": {
                        "items": {
                          "properties": {
                            "accountId": {
                              "type": "number",
                              "description": "Account ID"
                            },
                            "label": {
                              "type": "string",
                              "description": "Account name"
                            },
                            "ownerId": {
                              "type": "number",
                              "description": "Owner ID"
                            },
                            "agencyId": {
                              "type": "number",
                              "description": "Agency ID"
                            },
                            "isAgency": {
                              "type": "boolean",
                              "description": "Account is agency"
                            },
                            "createdAt": {
                              "type": "string",
                              "description": "Account create date"
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
        }
      });
      mock.onGet(linkCampaign).reply(function(config) {
        let data = [
          {
            "campaignId": "1",
            "accountId": "1",
            "label": "campaign name 1",
            "defaultTrackingNumberId": "1",
            "beganAt": "2019-04-01T16:58:02+09:00",
            "finishedAt": "2019-04-01T16:58:02+09:00",
            "createdAt": "2019-04-01T16:58:02+09:00",
            "deletedAt": "2019-04-01T16:58:02+09:00",
          }
        ];
        if (config.params.campaignId !== undefined && Number(config.params.campaignId) === 1) {
          data = [
            {
              "campaignId": "1",
              "accountId": "1",
              "label": "campaign name 1",
              "defaultTrackingNumberId": "1",
              "beganAt": "2019-04-01T16:58:02+09:00",
              "finishedAt": "2019-04-01T16:58:02+09:00",
              "createdAt": "2019-04-01T16:58:02+09:00",
              "deletedAt": "2019-04-01T16:58:02+09:00",
              "_embedded": {
                "observers": [
                  {
                    "observerId": "1",
                    "label": "observer name"
                  }
                ],
                "trackingNumbers": [
                  {
                    "trackingNumberId": "1",
                    "phoneNumber": "0123456789"
                  }
                ]
              }
            }
          ];
        } else if(config.params.campaignId !== undefined && Number(config.params.campaignId) !== 1) {
          return [
            404,
            {
              "error": "Invalid request",
              "messages": "Campaign not exits"
            }
          ];
        };

        return [
          200,
          {
            "count": 100,
            "total": 1,
            "_embedded": {
              "campaigns": data
            },
            "_schema": {
              "properties": {
                "_embedded": {
                  "properties": {
                    "campaigns": {
                      "items": {
                        "properties": {
                          "campaignId": {
                            "type": "number",
                            "description": "Campaign ID"
                          },
                          "accountId": {
                            "type": "number",
                            "description": "Account ID"
                          },
                          "label": {
                            "type": "string",
                            "description": "Campaign name"
                          },
                          "defaultTrackingNumberId": {
                            "type": "number",
                            "description": "Default tracking number ID"
                          },
                          "beganAt": {
                            "type": "string",
                            "description": "Begin date of the campaign"
                          },
                          "finishedAt": {
                            "type": "string",
                            "description": "Finish date of the campaign"
                          },
                          "createdAt": {
                            "type": "string",
                            "description": "Date of creation"
                          },
                          "deletedAt": {
                            "type": "string",
                            "description": "Date of deletion"
                          },
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
      mock.onGet(linkAccount).reply(function() {
        return [
          500,
          {"error":'invalid_request', "messages": 'unknown error'}
        ];
      });

      mock.onGet(linkCampaign).reply(function() {
        return [
          500,
          {"error":'invalid_request', "messages": 'unknown error'}
        ];
      });
    }
  },
};
