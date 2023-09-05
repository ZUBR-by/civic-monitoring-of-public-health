import {defineConfig} from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch = process.env.HEAD || process.env.VERCEL_GIT_COMMIT_REF || "master";
const clientId = process.env.TINA_CLIENT_ID || "b1214c08-42cd-4fd6-8acd-1304d894e9cc";
const token = process.env.TINA_TOKEN || "d97997fc7f09d8e5ddacee6cf64069613f16b1df";

export default defineConfig({
    branch,
    clientId, // Get this from tina.io
    token, // Get this from tina.io

    build: {
        outputFolder: "admin",
        publicFolder: "static",
    },
    media: {
        tina: {
            mediaRoot: "",
            publicFolder: "static",
        },
    },
    schema: {
        collections: [
            {
                name: "post",
                format: "md",
                label: "Публикации",
                path: "content/post",
                fields: [
                    {
                        type: "string",
                        name: "title",
                        label: "Title",
                        isTitle: true,
                        required: true,
                    },
                    {
                        type: "rich-text",
                        name: "body",
                        label: "Body",
                        isBody: true,
                        templates: [
                            {
                                name: 'figure',
                                label: 'figure',
                                match: {
                                    start: '{{<',
                                    end: '>}}',
                                },
                                fields: [
                                    {
                                        name: 'src',
                                        label: 'Content',
                                        type: 'string',
                                        required: true,
                                        ui: {
                                            component: 'textarea',
                                        },
                                    },
                                ],
                            },
                            {
                                name: 'table',
                                label: 'table',
                                match: {
                                    start: '{{<',
                                    end: '>}}',
                                },
                                fields: [
                                    {
                                        name: 'caption',
                                        label: 'caption',
                                        type: 'string',
                                        ui: {
                                            component: 'textarea',
                                        },
                                    },
                                    {
                                        name: 'src',
                                        label: 'src',
                                        type: 'string',
                                        ui: {
                                            component: 'textarea',
                                        },
                                    },
                                ],
                            },
                          {
                            name: 'hr',
                            label: 'hr',
                            match: {
                              start: '{{<',
                              end: '>}}',
                            },
                            fields: [
                              {
                                name: 'caption',
                                label: 'caption',
                                type: 'string',
                                ui: {
                                  component: 'textarea',
                                },
                              },
                            ],
                          },
                          {
                            name: 'sup',
                            label: 'sup',
                            match: {
                              start: '{{<',
                              end: '>}}',
                            },
                            fields: [
                              {
                                name: 'caption',
                                label: 'caption',
                                type: 'string',
                                ui: {
                                  component: 'textarea',
                                },
                              },
                            ],
                          },
                        ]
                    },
                ],
            },
        ],
    },
});
