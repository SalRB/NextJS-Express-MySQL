import bookConsumer from "./bookConsumer";
import userConsumer from "./userConsumer";

const consumers = {
    ApiBook: { ...bookConsumer },
    ApiUser: { ...userConsumer },
}

export default consumers;
