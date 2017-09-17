<?php
include_once 'defaults.php';
include_once 'settings.php';

/**
 * @param \WP_REST_Request $req
 */
function srizon_mortgage_save_instance( $req ) {
	$json_data = json_decode( $req->get_body() );
	$title     = $json_data->title;

	$payload            = [ ];
	$payload['title']   = $title;
	$payload['options'] = serialize( srizon_mortgage_get_global_settings() );

	SrizonMortgageDB::saveInstance( $payload );

	$ret['result'] = 'saved';
	$ret['albums'] = srizon_mortgage_get_album_index();
	$ret['api']    = $payload;

	return $ret;
}

function srizon_mortgage_get_album_index() {
	return SrizonMortgageDB::getAllInstances();
}

/**
 * @param \WP_REST_Request $req
 *
 * @return mixed
 */
function srizon_mortgage_save_hashtag_album( $req ) {
	$json_data = json_decode( $req->get_body() );
	$hashtag   = trim( $json_data->hashtag, " \t\n\r\0\x0B" );

	if ( strlen( $hashtag ) == 0 ) {
		return new WP_Error( 'hashtag_empty', 'Empty Hashtag. Please provide something valid', [ 'status' => 404 ] );
	}

	if ( trim( $json_data->title ) ) {
		$title = trim( $json_data->title );
	} else {
		$title = 'Photos with tag: ' . $hashtag;
	}

	$payload                    = [ ];
	$payload['title']           = $title;
	$payload['type']            = 'hashtag';
	$payload['userid']          = null;
	$payload['username']        = '';
	$payload['full_name']       = null;
	$payload['profile_picture'] = null;
	$payload['hashtag']         = $hashtag;
	$payload['options']         = serialize( srizon_mortgage_get_global_settings() );

	SrizonMortgageDB::saveInstance( $payload );
	$ret['result'] = 'saved';
	$ret['albums'] = srizon_mortgage_get_album_index();

	return $ret;
}

/**
 * @param array $req
 *
 * @return mixed
 */
function srizon_mortgage_delete_album( $req ) {
	SrizonMortgageDB::deleteInstance( $req['id'] );
	$ret['result'] = 'deleted';
	$ret['albums'] = srizon_mortgage_get_album_index();

	return $ret;
}

/**
 * @param array $req
 *
 * @return mixed
 */
function srizon_mortgage_get_album( $req ) {
	$album = SrizonMortgageDB::getInstance( (int) $req['id'] );
	if ( $album ) {
		$ret['result'] = 'success';
		$ret['album']  = $album;

		return $ret;
	}

	return new WP_Error( 'album_not_found', 'Album Not Found. Make sure that the shortcode matches and existing album', [ 'status' => 404 ] );
}

/**
 * @param \WP_REST_Request $req
 *
 * @return mixed
 */
function srizon_mortgage_update_album_settings( $req ) {
	$json_data = json_decode( $req->get_body() );

	SrizonMortgageDB::updateInstanceSettings( $json_data->id, $json_data->settings );
	$ret['result'] = 'updated';
	$ret['albums'] = srizon_mortgage_get_album_index();

	return $ret;
}

/**
 * @param \WP_REST_Request $req
 */
function srizon_mortgage_get_album_data( $req ) {
	$json_data = json_decode( $req->get_body() );

	$album = SrizonMortgageDB::getInstance( (int) $json_data->id );

	if ( $album ) {
		$ret['result'] = 'success';
		$ret['data']   = SrizonInstaAPI::getAlbumData( $json_data->id );

		return $ret;
	}

	return new WP_Error( 'album_not_found', 'Album Not Found. Make sure that the shortcode matches and existing album', [ 'status' => 404 ] );
}

/**
 * @param \WP_REST_Request $req
 *
 * @return mixed
 */
function srizon_mortgage_get_album_load_more( $req ) {
	$json_data = json_decode( $req->get_body() );

	$ret['result'] = 'success';
	$ret['data']   = SrizonInstaAPI::getAlbumLoadMore( $json_data->id, $json_data->url );

	return $ret;
}

/**
 * @param \WP_REST_Request $req
 *
 * @return mixed
 */
function srizon_mortgage_sync_album( $req ) {
	$json_data = json_decode( $req->get_body() );

	$ret['result'] = 'success';
	$ret['data']   = SrizonInstaAPI::syncAlbum( $json_data->id );

	return $ret;
}

add_action( 'rest_api_init', function () {
	register_rest_route( 'srizon-instagram/v1', '/instance/', [
		'methods'             => 'POST',
		'callback'            => 'srizon_mortgage_save_instance',
		'permission_callback' => 'srizon_mortgage_permission_admin',
	] );

	register_rest_route( 'srizon-instagram/v1', '/album/', [
		'methods'  => 'GET',
		'callback' => 'srizon_mortgage_get_album_index',
	] );

	register_rest_route( 'srizon-instagram/v1', '/album-data/', [
		'methods'  => 'POST',
		'callback' => 'srizon_mortgage_get_album_data',
	] );
	register_rest_route( 'srizon-instagram/v1', '/album-sync/', [
		'methods'  => 'POST',
		'callback' => 'srizon_mortgage_sync_album',
	] );
	register_rest_route( 'srizon-instagram/v1', '/album-load-more/', [
		'methods'  => 'POST',
		'callback' => 'srizon_mortgage_get_album_load_more',
	] );

	register_rest_route( 'srizon-instagram/v1', '/album/(?P<id>[\d]+)', [
		'methods'             => 'DELETE',
		'callback'            => 'srizon_mortgage_delete_album',
		'permission_callback' => 'srizon_mortgage_permission_admin',
	] );
	register_rest_route( 'srizon-instagram/v1', '/album/(?P<id>[\d]+)', [
		'methods'  => 'GET',
		'callback' => 'srizon_mortgage_get_album',
	] );

	register_rest_route( 'srizon-instagram/v1', '/hashtagalbum/', [
		'methods'             => 'POST',
		'callback'            => 'srizon_mortgage_save_hashtag_album',
		'permission_callback' => 'srizon_mortgage_permission_admin',
	] );
	register_rest_route( 'srizon-instagram/v1', '/album-settings/', [
		'methods'             => 'POST',
		'callback'            => 'srizon_mortgage_update_album_settings',
		'permission_callback' => 'srizon_mortgage_permission_admin',
	] );
} );
