import * as _ from "@/applications/applicationList/search/search_task/style.ts";
import Up from "@/assets/search/point_up.svg";
import Down from "@/assets/search/point_down.svg";
import {useState} from "react";
import Option from "@/applications/applicationList/search/option";

interface FilterBlockProps {
    label: string;
    option: string;
    isOpen: boolean;
    onClick: () => void;
}

const Search_task = () => {
    const [animation, setAnimation] = useState(false);
    const [death, setDeath] = useState(false);

    const [fillDeath, setFillDeath] = useState("모두");
    const [fillAni, setFillAni] = useState("없음");
    const deathReason = ["모두","자연사(自然死)","병사(病死)","돌연사(突然死)","외인사(外因死)"]
    const  animationType= ["없음","모두 (스포일러 주의!)","최애의 아이","데스노트","원피스"]

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
                                <FilterBlock
                                    label="애니메이션"
                                    option={fillAni}
                                    isOpen={animation}
                                    onClick={handleAnimation}
                                />
                                {animation && <Option list={animationType} onChange={setFillAni}/>}
                                <FilterBlock
                                    label="사인"
                                    option={fillDeath}
                                    isOpen={death}
                                    onClick={handleDeath}
                                />
                                {death && <Option list={deathReason} onChange={setFillDeath}/>}
                            </_.search_main>
                        </div>
                    </div>
                </div>
            </_.styles>
        </_.search>
    );
}
const FilterBlock = ({ label, option, isOpen, onClick }: FilterBlockProps) => {
    return (
        <div>
            <label>{label}</label>
            <_.black>
                <_.white>
                    <_.dark>
                        <_.option>{option}</_.option>
                        <_.button onClick={onClick}>
                            <_.styles>
                                <div>
                                    <div>
                                        <div>
                                            <img src={isOpen ? Up : Down} alt={isOpen ? "close" : "open"} />
                                        </div>
                                    </div>
                                </div>
                            </_.styles>
                        </_.button>
                    </_.dark>
                </_.white>
            </_.black>
        </div>
    );
};
export default Search_task;