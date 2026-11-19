import { __ } from '@wordpress/i18n';
import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';
import { TextControl } from '@wordpress/components';
import EditorBlockShell from '../../_shared/EditorBlockShell';

export default function Edit( { attributes, setAttributes, clientId } ) {
	const { title } = attributes;
	const blockProps = useBlockProps( { className: 'container cb-istp2027-editor-block' } );
	const innerBlocksProps = useInnerBlocksProps(
		{ className: 'cb-istp2027-editor-field__control cb-istp2027-inner-content' },
		{
			allowedBlocks: [ 'core/paragraph', 'core/list', 'core/heading', 'core/spacer' ],
			template: [ [ 'core/paragraph' ] ],
			templateLock: false,
		}
	);

	return (
		<EditorBlockShell blockProps={ blockProps } clientId={ clientId } title="Title & Text" textDomain="cb-istp2027">
			<TextControl
				label={ __( 'Title (h2)', 'cb-istp2027' ) }
				value={ title }
				onChange={ ( value ) => setAttributes( { title: value } ) }
			/>
			<div className="cb-istp2027-editor-field">
				<label className="cb-istp2027-editor-field__label">{ __( 'Text', 'cb-istp2027' ) }</label>
				<div { ...innerBlocksProps } />
			</div>
		</EditorBlockShell>
	);
}
