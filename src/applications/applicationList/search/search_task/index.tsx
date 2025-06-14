import * as _ from "@/applications/applicationList/search/search_task/style.ts";
import Up from "@/assets/search/point_up.svg";
import Down from "@/assets/search/point_down.svg";
import {useState} from "react";

const Search_task = () => {
    const [animation, setAnimation] = useState(false);
    const [death, setDeath] = useState(false);
    const handleAnimation = () => {
        setAnimation(!animation)
    }
    const handleDeath = () => {
        setDeath(!death)
    }
    return (
        <_.search>
            <_.styles>
                <div>
                    <div>
                        <div>
                            <_.search_main>
                                <_.name>
                                    <label>이름</label>
                                    <_.black>
                                        <_.white>
                                            <_.dark>
                                                <_.input type={"text"}/>
                                            </_.dark>
                                        </_.white>
                                    </_.black>
                                </_.name>
                                <div>
                                    <label>애니메이션</label>
                                    <_.black>
                                        <_.white>
                                            <_.dark>
                                                <_.option>없음</_.option>
                                                <_.button onClick={handleAnimation}>
                                                    <_.styles>
                                                        <div>
                                                            <div>
                                                                <div>
                                                                    <img src={animation?Up:Down} alt={animation?"close":"open"}/>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </_.styles>
                                                </_.button>
                                            </_.dark>
                                        </_.white>
                                    </_.black>
                                </div>
                                <div>
                                    <label>사인</label>
                                    <_.black>
                                        <_.white>
                                            <_.dark>
                                                <_.option>모두</_.option>
                                                <_.button onClick={handleDeath}>
                                                    <_.styles>
                                                        <div>
                                                            <div>
                                                                <div>
                                                                    <img src={death?Up:Down} alt={death?"close":"open"}/>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </_.styles>
                                                </_.button>
                                            </_.dark>
                                        </_.white>
                                    </_.black>
                                </div>
                            </_.search_main>
                        </div>
                    </div>
                </div>
            </_.styles>
        </_.search>
    );
}
export default Search_task;