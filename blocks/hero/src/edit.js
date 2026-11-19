import { __ } from '@wordpress/i18n';
import { useBlockProps, MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { TextControl, RangeControl, Button } from '@wordpress/components';
import EditorBlockShell from '../../_shared/EditorBlockShell';

function ImageField( { label, id, url, onSelect, onClear } ) {
	return (
		<div className="cb-istp2027-editor-field">
			<label className="cb-istp2027-editor-field__label">{ label }</label>
			<MediaUploadCheck>
				<MediaUpload
					onSelect={ onSelect }
					allowedTypes={ [ 'image' ] }
					value={ id }
					render={ ( { open } ) => (
						<div className="cb-istp2027-editor-field__control">
							{ url && (
								<img
									src={ url }
									alt=""
									style={ { maxWidth: '200px', display: 'block', marginBottom: '8px' } }
								/>
							) }
							<Button variant="secondary" onClick={ open }>
								{ url ? __( 'Replace', 'cb-istp2027' ) : __( 'Select', 'cb-istp2027' ) } { label }
							</Button>
							{ url && (
								<Button variant="link" isDestructive onClick={ onClear } style={ { marginLeft: '12px' } }>
									{ __( 'Remove', 'cb-istp2027' ) }
								</Button>
							) }
						</div>
					) }
				/>
			</MediaUploadCheck>
		</div>
	);
}

export default function Edit( { attributes, setAttributes, clientId } ) {
	const { backgroundId, backgroundUrl, overlayOpacity, logoId, logoUrl, logoAlt, title, subtitle, intro } = attributes;
	const blockProps = useBlockProps( { className: 'container cb-istp2027-editor-block' } );

	return (
		<EditorBlockShell blockProps={ blockProps } clientId={ clientId } title="Hero" textDomain="cb-istp2027">
			<ImageField
				label={ __( 'Background image', 'cb-istp2027' ) }
				id={ backgroundId }
				url={ backgroundUrl }
				onSelect={ ( media ) => setAttributes( { backgroundId: media.id, backgroundUrl: media.url } ) }
				onClear={ () => setAttributes( { backgroundId: 0, backgroundUrl: '' } ) }
			/>
			<RangeControl
				label={ __( 'Overlay opacity (%)', 'cb-istp2027' ) }
				value={ overlayOpacity }
				onChange={ ( value ) => setAttributes( { overlayOpacity: value ?? 0 } ) }
				min={ 0 }
				max={ 100 }
				help={ __( 'Dark layer between the background image and the content.', 'cb-istp2027' ) }
			/>
			<ImageField
				label={ __( 'Logo', 'cb-istp2027' ) }
				id={ logoId }
				url={ logoUrl }
				onSelect={ ( media ) => setAttributes( { logoId: media.id, logoUrl: media.url } ) }
				onClear={ () => setAttributes( { logoId: 0, logoUrl: '' } ) }
			/>
			<TextControl
				label={ __( 'Logo alt text', 'cb-istp2027' ) }
				value={ logoAlt }
				onChange={ ( value ) => setAttributes( { logoAlt: value } ) }
			/>
			<TextControl
				label={ __( 'Title (h1)', 'cb-istp2027' ) }
				value={ title }
				onChange={ ( value ) => setAttributes( { title: value } ) }
			/>
			<TextControl
				label={ __( 'Subtitle', 'cb-istp2027' ) }
				value={ subtitle }
				onChange={ ( value ) => setAttributes( { subtitle: value } ) }
			/>
			<TextControl
				label={ __( 'Intro', 'cb-istp2027' ) }
				value={ intro }
				onChange={ ( value ) => setAttributes( { intro: value } ) }
				help={ __( 'Dates and location line.', 'cb-istp2027' ) }
			/>
		</EditorBlockShell>
	);
}
