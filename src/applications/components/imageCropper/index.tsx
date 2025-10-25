import { useRef, useState } from 'react';
import AvatarEditor from 'react-avatar-editor';
import MemorialBtn from '@/applications/components/memorialBtn';
import { setCursorImage, CURSOR_IMAGES } from '@/lib/setCursorImg';
import * as _ from './style';

interface ImageCropperProps {
  isOpen: boolean;
  imageSrc: string;
  cropSize: { width: number; height: number };
  onConfirm: (croppedImage: string) => void;
  onCancel: () => void;
}

const ImageCropper = ({ isOpen, imageSrc, cropSize, onConfirm, onCancel }: ImageCropperProps) => {
  const editorRef = useRef<AvatarEditor | null>(null);
  const [scale, setScale] = useState<number>(1);

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (editorRef.current) {
      const canvas = editorRef.current.getImageScaledToCanvas().toDataURL();
      onConfirm(canvas);
      setScale(1); // Reset scale for next use
    }
  };

  const handleCancel = () => {
    setScale(1); // Reset scale
    onCancel();
  };

  return (
    <_.ImgCropContainer>
      <_.ImgCropInner>
        <_.Connnnn>
          <AvatarEditor
            ref={editorRef}
            image={imageSrc}
            width={cropSize.width}
            height={cropSize.height}
            border={20}
            borderRadius={0}
            color={[0, 0, 0, 0.6]}
            scale={scale}
            rotate={0}
            style={{ cursor: 'none' }}
          />
          <_.CropText>드래그하여 이미지 위치 변경!</_.CropText>
        </_.Connnnn>
        <_.Connnnn>
          <_.RangeSlider
            type="range"
            min={1}
            max={3}
            step={0.1}
            value={scale}
            percent={((scale - 1) / 2) * 100}
            onChange={(e) => setScale(parseFloat(e.target.value))}
            onMouseEnter={() => setCursorImage(CURSOR_IMAGES.hand)}
            onMouseLeave={() => setCursorImage(CURSOR_IMAGES.default)}
          />
          <_.CropText>이미지 확대/축소</_.CropText>
        </_.Connnnn>
        <_.BtnContainer>
          <MemorialBtn
            name="확인"
            onClick={handleConfirm}
            type="submit"
            active={true}
            width="144px"
            height="40px"
            fontSize="18px"
          />
          <MemorialBtn
            name="취소"
            onClick={handleCancel}
            type="submit"
            active={true}
            width="144px"
            height="40px"
            fontSize="18px"
          />
        </_.BtnContainer>
      </_.ImgCropInner>
    </_.ImgCropContainer>
  );
};

export default ImageCropper;
