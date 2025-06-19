import { Connection } from "mongoose";


declare global{                  //ts k liye krre hai, and jse browser mai window obj hoti h , wse hi node mai global obj hoti hai
    var mongoose:{              // to use declare krre hai
        conn: Connection | null,
        promise: Promise<Connection> | null
    }
}

export {}