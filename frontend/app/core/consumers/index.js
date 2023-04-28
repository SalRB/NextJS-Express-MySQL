import bookConsumer from "./bookConsumer";
import bookshelfConsumer from "./bookshelfConsumer";
import commentConsumer from "./commentConsumer";
import userConsumer from "./userConsumer";

const consumers = {
    ApiBook: { ...bookConsumer },
    ApiBookshelf: { ...bookshelfConsumer },
    ApiUser: { ...userConsumer },
    ApiComment: { ...commentConsumer },
}

export default consumers;
