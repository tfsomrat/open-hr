import { TPagination } from "@/types";
import { apiSlice } from "../apiSlice/apiSlice";
import { TLeaveRequest, TLeaveRequestState } from "./leaveRequestType";

const leaveRequestApiWithTag = apiSlice.enhanceEndpoints({
  addTagTypes: ["leave-requests"],
});

export const leaveRequestApi = leaveRequestApiWithTag.injectEndpoints({
  endpoints: (builder) => ({
    getLeaveRequests: builder.query<TLeaveRequestState, TPagination>({
      query: ({ page, limit, search }) => ({
        url: `/leave-request?page=${page}&limit=${limit}&search=${search}`,
        method: "GET",
      }),
      providesTags: ["leave-requests"],
      keepUnusedDataFor: 30 * 60,
    }),

    getLeaveRequest: builder.query<TLeaveRequestState<TLeaveRequest>, string>({
      query: (id) => ({
        url: `/leave-request/${id}`,
        method: "GET",
      }),
      providesTags: ["leave-requests"],
    }),

    getUpcomingLeaveRequests: builder.query<TLeaveRequestState, string>({
      query: (date) => ({
        url: `/leave-request/upcoming?current_date=${date}`,
        method: "GET",
      }),
      providesTags: ["leave-requests"],
      keepUnusedDataFor: 30 * 60,
    }),

    addLeaveRequest: builder.mutation<TLeaveRequestState, TLeaveRequest>({
      query: (data) => ({
        url: `/leave-request`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["leave-requests"],
    }),

    updateLeaveRequest: builder.mutation({
      query: (data) => {
        return {
          url: `/leave-request/${data._id}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["leave-requests"],
    }),

    deleteLeaveRequest: builder.mutation({
      query: (id) => ({
        url: `/leave-request/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["leave-requests"],
    }),
  }),
});

export const {
  useGetLeaveRequestsQuery,
  useGetLeaveRequestQuery,
  useGetUpcomingLeaveRequestsQuery,
  useAddLeaveRequestMutation,
  useUpdateLeaveRequestMutation,
  useDeleteLeaveRequestMutation,
} = leaveRequestApi;
