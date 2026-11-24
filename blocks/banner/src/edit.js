import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText, MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { TextControl, Button } from '@wordpress/components';
import EditorBlockShell from '../../_shared/EditorBlockShell';

export default function Edit( { attributes, setAttributes, clientId } ) {
	const { title, content, iconId, iconUrl } = attributes;
	const blockProps = useBlockProps( { className: 'container cb-istp2027-editor-block' } );

	return (
		<EditorBlockShell blockProps={ blockProps } clientId={ clientId } title="Banner" textDomain="cb-istp2027">
			<div className="cb-istp2027-editor-field">
				<label className="cb-istp2027-editor-field__label">{ __( 'Icon (SVG or PNG)', 'cb-istp2027' ) }</label>
				<MediaUploadCheck>
					<MediaUpload
						onSelect={ ( media ) => setAttributes( { iconId: media.id, iconUrl: media.url } ) }
						allowedTypes={ [ 'image' ] }
						value={ iconId }
						render={ ( { open } ) => (
							<div className="cb-istp2027-editor-field__control">
								{ iconUrl && (
									<img
										src={ iconUrl }
										alt=""
										style={ { maxWidth: '64px', maxHeight: '64px', display: 'block', marginBottom: '8px' } }
									/>
								) }
								<Button variant="secondary" onClick={ open }>
									{ iconUrl ? __( 'Replace icon', 'cb-istp2027' ) : __( 'Select icon', 'cb-istp2027' ) }
								</Button>
								{ iconUrl && (
									<Button
										variant="tertiary"
										isDestructive
										onClick={ () => setAttributes( { iconId: 0, iconUrl: '' } ) }
									>
										{ __( 'Remove', 'cb-istp2027' ) }
									</Button>
								) }
							</div>
						) }
					/>
				</MediaUploadCheck>
			</div>
			<TextControl
				label={ __( 'Title', 'cb-istp2027' ) }
				value={ title }
				onChange={ ( value ) => setAttributes( { title: value } ) }
			/>
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
