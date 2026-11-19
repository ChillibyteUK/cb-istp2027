import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText } from '@wordpress/block-editor';
import EditorBlockShell from '../../_shared/EditorBlockShell';

export default function Edit( { attributes, setAttributes, clientId } ) {
	const { content } = attributes;
	const blockProps = useBlockProps( { className: 'container cb-istp2027-editor-block' } );

	return (
		<EditorBlockShell blockProps={ blockProps } clientId={ clientId } title="Banner" textDomain="cb-istp2027">
			<div className="cb-istp2027-editor-field">
				<label className="cb-istp2027-editor-field__label">{ __( 'Content', 'cb-istp2027' ) }</label>
				<RichText
					tagName="div"
					className="cb-istp2027-editor-field__control"
					aria-label={ __( 'Content', 'cb-istp2027' ) }
					placeholder={ __( 'Content', 'cb-istp2027' ) }
					value={ content }
					onChange={ ( value ) => setAttributes( { content: value } ) }
					allowedFormats={ [ 'core/bold', 'core/italic', 'core/link' ] }
				/>
			</div>
		</EditorBlockShell>
	);
}
