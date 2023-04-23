import consumers from "./consumers/index";

const consume = async (consumer, method, data) => {
    return await consumers[consumer][method](data);
}

export default consume;
