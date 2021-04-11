declare function jsonMatchPlugin(chai: any, utils: any): void;

declare global {
    namespace Chai {
        interface Assertion {
            haveSchema(schema: Object | any[]);
            haveSchemaStrict(schema: Object | any[]);
        }
    }
}


export = jsonMatchPlugin;
