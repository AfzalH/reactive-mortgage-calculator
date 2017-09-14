<!doctype html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Redirector</title>
	<script>
		//var fragment = window.location.hash;
		var return_url = <?php if ( isset( $_REQUEST['return_url'] ) ) {
			echo "'" . $_REQUEST['return_url'] . "'";
		} else {
			echo 'false';
		}?>;

		function getHashParams() {
			var hashParams = {};
			var e,
				a = /\+/g,  // Regex for replacing addition symbol with a space
				r = /([^&;=]+)=?([^&;]*)/g,
				d = function (s) {
					return decodeURIComponent(s.replace(a, " "));
				},
				q = window.location.hash.substring(1);

			while (e = r.exec(q))
				hashParams[d(e[1])] = d(e[2]);

			return hashParams;
		}

		var params = getHashParams();
		if (params.access_token != undefined) {
			if (return_url != false) {
				window.location = return_url + '&access_token=' + params.access_token;
			}
		}

	</script>
</head>
<body>
<?php
if ( isset( $_REQUEST['error'] ) ) {
	?>
	<div style="text-align: center">
		<h1 style="color: #AA0000">Error!!</h1>
		<p>
			<strong>Reason:</strong>
			<em><?php echo isset( $_REQUEST['error_description'] ) ? $_REQUEST['error_description'] : 'Unknown' ?></em>
		</p>
	</div>
	<?php
}
?>
</body>
</html>
