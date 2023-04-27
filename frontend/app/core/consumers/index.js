import bookConsumer from "./bookConsumer";
import bookshelfConsumer from "./bookshelfConsumer";
import userConsumer from "./userConsumer";

const consumers = {
    ApiBook: { ...bookConsumer },
    ApiBookshelf: { ...bookshelfConsumer },
    ApiUser: { ...userConsumer },
}

export default consumers;
