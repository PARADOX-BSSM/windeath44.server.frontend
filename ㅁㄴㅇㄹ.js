<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>마우스 가두기</title>
    <style>
        #container {
            width: 500px;
            height: 300px;
            border: 2px solid black;
            display: flex;
            justify-content: center;
            align-items: center;
            text-align: center;
            cursor: pointer;
        }
    </style>
</head>
<body>

<div id="container">클릭하여 마우스 커서를 가둡니다</div>

<script>
    const container = document.getElementById("container");

    container.addEventListener("click", () => {
        container.requestPointerLock();
    });

    document.addEventListener("pointerlockchange", () => {
        if (document.pointerLockElement === container) {
            console.log("마우스가 컨테이너에 갇혔습니다!");
        } else {
            console.log("마우스가 해제되었습니다.");
        }
    });
</script>

</body>
</html>
