import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks } from '@wordpress/block-editor';
import Edit from './edit';
import metadata from '../block.json';

registerBlockType( metadata.name, {
	edit: Edit,
	// The text column is inner blocks; the title and layout render in render.php.
	save: () => <InnerBlocks.Content />,
} );
