import { createAsyncThunk } from '@reduxjs/toolkit'
import { moduleName } from '../reducer'
import { prepMutation } from '../../utils'
import { refreshAccessToken, validate } from './register'

import { editProfile, selectAvatar } from '../../../graphql/profile/mutations'
import { ProfileMutationClient } from '../../../graphql/profile/client'
import { editUsername } from '../../../graphql/accounts/mutations'
import { AccountsClient } from '../../../graphql/accounts/client'


export const otherProfileReset = createAsyncThunk(
  moduleName + '/otherprofile_reset',
  async (_, { dispatch }) => {
    dispatch({
        type: moduleName + "/reset_othersProfile",
       
      });


    return;
  }
)