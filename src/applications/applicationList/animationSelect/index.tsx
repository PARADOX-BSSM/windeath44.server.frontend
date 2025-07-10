import * as _ from './style';
import { useState } from 'react';
import Inputs from '@/applications/components/inputs';
import Poster from '@/assets/animation/abdks.png'

const AnimationSelect = () => {
    const [name, setName] = useState("");

    const DemoAnimation = {
        animations: [
            {
                image: Poster,
                name: "그 비스크 돌은 사랑을 한다 2기"
            },
            {
                image: Poster,
                name: "최애의 아이"
            },
            {
                image: Poster,
                name: "장송의 프리렌"
            },
            {
                image: Poster,
                name: "데스노트"
            },
            {
                image: Poster,
                name: "원피스"
            },
        ]
    }

    return (
        <_.Container>
            <Inputs width='100%' fontSize='1rem' label='애니메이션 이름' value={name} type='text' setValue={setName} />
                <_.Board>
                    <_.Rows>
                        {
                            (
                                () => {
                                    const filtered = DemoAnimation.animations.filter((animation) => {
                                        return animation.name.trim().includes(name.trim());
                                    });

                                    return filtered.map((animation) => {
                                        const element = <_.Item>
                                                                <_.Image src={animation.image} />
                                                                <_.Name>{animation.name}</_.Name>
                                                            </_.Item>
                                        return element
                                    });
                                }
                            )()
                        }
                    </_.Rows>
                </_.Board>
        </_.Container>
        
    );
}

export default AnimationSelect;