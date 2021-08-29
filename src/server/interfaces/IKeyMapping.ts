import EKeyMapper from "../enums/EKeyMapper";

interface IKeyMapping {
    commandString: string,
    description: string,
    defaultMapper: EKeyMapper,
    defaultParameter: string
};

export default IKeyMapping;