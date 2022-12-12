import { createAction } from '@ngrx/store';
import {ImportModel} from "../../model/import.model";

export const addImportXml = createAction('[Simulation Component] Add XML_IMPORT', (importModel: ImportModel ) => ({importModel}));

