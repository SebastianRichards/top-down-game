let boundaryJsonData = null;
let doorJsonData = null;
let battleJsonData = null;
let pcJsonData = null;

export const setBoundaryJsonData = (data) => {
    boundaryJsonData = data;
};

export const getBoundaryJsonData = () => {
    return boundaryJsonData;
};

export const setDoorJsonData = (data) => {
    doorJsonData = data;
};

export const getDoorJsonData = () => {
    return doorJsonData;
};

export const setBattleJsonData = (data) => {
    battleJsonData = data;
};

export const getBattleJsonData = () => {
    return battleJsonData;
};

export const setPcJsonData = (pcJsonDataSetter) => {
    pcJsonData = pcJsonDataSetter;
}

export const getPcJsonData = () => {
    return pcJsonData
}