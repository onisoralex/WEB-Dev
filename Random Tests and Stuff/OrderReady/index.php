<!DOCTYPE HTML>
<html>

<head>
  <title>
    OrderReady
  </title>
  <!-- Google Fonts -->
  <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" rel="stylesheet" />
  <script type="module" src="./main.js"></script>
  <link rel="stylesheet" href="style.css">
</head>

<body>
  <div id="orderdisplay" class="flexcontainer">

  </div>
  <hr>

  <div class="controlview flexcontainer">
    <label id="placeholder"></label>
    <div id="newnumber" class="flexcontainer">
      <input id="numberinput" type="number" min="100" max="999" value="100" oninput="validateNumber(event)" />
      <button class="addbutton" onclick="add()">Add</button>
    </div>
    <div class="trashbin dndfields" ondrop="drop(event)" ondragover="allowDrop(event)">
      T
      <i class="fa fa-trash trashicon" aria-hidden="true"></i>
    </div>
  </div>

  <?php
echo "My first PHP script!";
?>
</body>

</html>