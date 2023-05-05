import bookConsumer from "./bookConsumer";
import bookshelfConsumer from "./bookshelfConsumer";
import commentConsumer from "./commentConsumer";
import objectiveConsumer from "./objectiveConsumer";
import userConsumer from "./userConsumer";

const consumers = {
    ApiBook: { ...bookConsumer },
    ApiBookshelf: { ...bookshelfConsumer },
    ApiUser: { ...userConsumer },
    ApiComment: { ...commentConsumer },
    ApiObjective: { ...objectiveConsumer },
}

export default consumers;
