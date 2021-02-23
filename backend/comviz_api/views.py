from django.shortcuts import render
from django.http import HttpResponse, JsonResponse

import sys,os
import json

sys.path.insert(1, '../compiler')

from shell import generateCompilationOutput

def submit_source_code(request):
	if request.method == 'POST':
		print(str(request.POST.get('source_code')))
		source_code = request.POST.get('source_code')
		result = generateCompilationOutput(source_code)
		print("Final Result "+str(result))
		return JsonResponse(result)
	else:
		return HttpResponse("Method Not Allowed",status=405)