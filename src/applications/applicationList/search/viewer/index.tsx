import * as _ from "@/applications/applicationList/search/viewer/style.ts";
import Up from "@/assets/search/point_up.svg";
import Down from "@/assets/search/point_down.svg";

const Viewer = () => {
    return (
        <_.view>
            <_.viewer>
                <_.styles_in>
                    <div>
                        <div>

                        </div>
                    </div>
                </_.styles_in>
            </_.viewer>
            <_.scroll>
                <div>
                    <_.styles_out>
                        <div>
                            <div>
                                <div>
                                    <img src={Up} />
                                </div>
                            </div>
                        </div>
                    </_.styles_out>
                </div>
                <_.scroll_bar>
                    <_.styles_out>
                        <div>
                            <div>
                                <div>
                                    <div></div>{/*움직이는 바*/}
                                </div>
                            </div>
                        </div>
                    </_.styles_out>
                </_.scroll_bar>
                <div>
                    <_.styles_out>
                        <div>
                            <div>
                                <div>
                                    <img src={Down} />
                                </div>
                            </div>
                        </div>
                    </_.styles_out>
                </div>
            </_.scroll>
        </_.view>
    );
}
export default Viewer;
